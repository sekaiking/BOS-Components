use crate::*;
use near_sdk::AccountId;
use near_sdk::Gas;
use near_sdk::PromiseError;
use serde_json::{json, Value};

const TGAS: u64 = 1_000_000_000_000;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct SBToken {
    pub token: u64,
    pub metadata: HashMap<String, Value>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(crate = "near_sdk::serde")]
#[serde(untagged)]
pub enum AccountData {
    String(AccountId),
    Object(SBToken),
}

type SBTokenData = Vec<(AccountId, Vec<AccountData>)>;

#[near_bindgen]
impl Contract {
    pub fn already_verified(&self, account_id: AccountId) -> bool {
        self.verified_accounts.contains(&account_id)
    }

    #[payable]
    // verify that the receiver is verified on i-am-human contract
    pub fn nft_mint(&mut self, receiver_id: AccountId, referrer_id: AccountId) -> Promise {
        // assert only receiver can call this function, so that no one can use this to get referral NFTs for themselves
        assert!(
            env::predecessor_account_id() == receiver_id,
            "Only receiver can call this function"
        );
        assert!(
            receiver_id != referrer_id,
            "Receiver and referrer cannot be the same"
        );

        // call registry contract to check if the user is verified
        let registry_contract_string = "registry.i-am-human.near".to_string();
        let registry_contract = AccountId::try_from(registry_contract_string.clone()).unwrap();
        let registry_method = "sbt_tokens_by_owner".to_string();
        let registry_args = json!({
            "account": receiver_id,
        })
        .to_string()
        .into_bytes();

        // call the registry contract to get the tokens owned by the user
        let promise = Promise::new(registry_contract).function_call(
            registry_method,
            registry_args,
            0,
            Gas(8 * TGAS),
        );

        // schedule a callback to 'nft_mint_continue', with the deposit
        return promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(5 * TGAS))
                .with_attached_deposit(env::attached_deposit())
                .nft_mint_continue(receiver_id, referrer_id),
        );
    }

    #[private]
    #[payable]
    pub fn nft_mint_continue(
        &mut self,
        #[callback_result] call_result: Result<SBTokenData, PromiseError>,
        receiver_id: AccountId,
        referrer_id: AccountId,
    ) {
        if call_result.is_err() {
            env::panic_str("The receiver is not verified on i-am-human contract");
        }
        let tokens: SBTokenData = call_result.unwrap();
        // check if the user is verified
        let gd_contract_string = "fractal.i-am-human.near".to_string();
        let gd_contract = AccountId::try_from(gd_contract_string.clone()).unwrap();

        // if it contains fractal.i-am-human.testnet
        let is_verified = tokens.iter().any(|(contract, _)| contract == &gd_contract);

        assert!(
            is_verified,
            "The receiver is not verified on i-am-human contract (using Fractal)"
        );

        // only one token can be minted per user
        let is_already_verified = self.verified_accounts.contains(&receiver_id);
        assert!(
            !is_already_verified,
            "The receiver already got his NFT badge"
        );

        // metadata for the receiver NFT
        let description = format!(
            "Shiny proof of {}'s successful human verification",
            receiver_id
        );
        let metadata = TokenMetadata {
            title: Some("I Am Human Badge".to_string()),
            description: Some(description),
            media: Some(
                "https://arweave.net/ihOiZLefWJcwPFRXl12KlT4tOgVR4BHBgnsAs-kznHw".to_string(),
            ),
            media_hash: None,
            copies: Some(1),
            issued_at: Some(env::block_timestamp() / 1000000),
            expires_at: None,
            starts_at: None,
            updated_at: None,
            extra: None,
            reference: Some("https://i-am-human.app/".to_string()),
            reference_hash: None,
        };
        // token id
        let token_id = self.nft_total_supply().0 + 1;
        // mint for the receiver
        self.internal_mint(token_id.to_string(), receiver_id.clone(), metadata);
        // add user to verified accounts
        self.verified_accounts.insert(&receiver_id);

        // metadata for the referrer NFT
        let description = format!(
            "Shiny proof that {} referred a human {}",
            referrer_id, receiver_id
        );
        let metadata = TokenMetadata {
            title: Some("I Am Human Referrer Badge".to_string()),
            description: Some(description),
            media: Some(
                "https://arweave.net/w2HiEyNUrwX9K4gAE15hBkfEcd0oARP_hrt9zr9LOSI".to_string(),
            ),
            media_hash: None,
            copies: Some(1),
            issued_at: Some(env::block_timestamp() / 1000000),
            expires_at: None,
            starts_at: None,
            updated_at: None,
            extra: None,
            reference: Some("https://i-am-human.app/".to_string()),
            reference_hash: None,
        };
        // token id
        let token_id = token_id + 1;
        // mint for the referrer
        self.internal_mint(token_id.to_string(), referrer_id.clone(), metadata);
        // increase reffered count
        let new_referred_count = self.referred_count.get(&referrer_id).unwrap_or(0) + 1;
        self.referred_count
            .insert(&referrer_id, &new_referred_count);

        // add referred user to referrer's list
        let mut referred_users =
            self.users_by_referrer
                .get(&referrer_id)
                .unwrap_or(UnorderedSet::new(
                    format!("{}_referred", referrer_id).as_bytes(),
                ));
        referred_users.insert(&receiver_id);
        self.users_by_referrer.insert(&referrer_id, &referred_users);
    }

    fn internal_mint(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        metadata: TokenMetadata,
    ) -> String {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // create a royalty map to store in the token
        let royalty = HashMap::new();

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: owner_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
            //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
            royalty,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes);

        //return the token ID
        token_id
    }
}
