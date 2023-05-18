import anyTest, { TestFn } from "ava";
import { NEAR, NearAccount, Worker, BN } from "near-workspaces";
import path from "path";
import {
  approveNFT,
  defaultCallOptions,
  DEFAULT_GAS,
  mintNFT,
  payForStorage,
  placeNFTForSale,
  purchaseListedNFT,
  transferNFT,
} from "./utils";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  const worker = await Worker.init({
    network: "testnet",
    testnetMasterAccountId: "avocado111.testnet",
    initialBalance: NEAR.parse("100 N").toJSON(),
  });
  const root = worker.rootAccount;

  const contractAccountId = "dev-1684341574557-24038853630501";
  const nft_contract = await root.getAccount(contractAccountId);

  const alice = await root.createSubAccount("alice", {
    initialBalance: NEAR.parse("50 N").toJSON(),
  });

  const bob = await root.createSubAccount("bob", {
    initialBalance: NEAR.parse("1 N").toJSON(),
  });

  const charlie = await root.createSubAccount("charlie", {
    initialBalance: NEAR.parse("1 N").toJSON(),
  });

  t.context.worker = worker;
  t.context.accounts = { root, nft_contract, alice, bob, charlie };
});

test("nft contract: nft mint call", async (t) => {
  const { alice, nft_contract, bob, charlie, root } = t.context.accounts;

  // make 50 accounts and call mint for each of them
  const a = 50;
  const accounts: any[] = [];
  for (let i = 0; i < a; i++) {
    const account = await root.createSubAccount(`account${i}`, {
      initialBalance: NEAR.parse("1 N").toJSON(),
    });
    accounts.push(account);

    const random = Math.floor(Math.random() * 10);

    for (let j = 0; j < random; j++) {
      await alice.call(
        nft_contract,
        "nft_mint",
        {
          receiver_id: alice,
          referrer_id: account,
        },
        defaultCallOptions()
      );
      console.log(j);
    }
    console.log(i);
  }

  const n = 5;
  for (let i = 0; i < n; i++) {
    await alice.call(
      nft_contract,
      "nft_mint",
      {
        receiver_id: alice,
        referrer_id: bob,
      },
      defaultCallOptions()
    );
    console.log(n);
  }

  const n1 = 5;
  for (let i = 0; i < n1; i++) {
    await bob.call(
      nft_contract,
      "nft_mint",
      {
        receiver_id: bob,
        referrer_id: charlie,
      },
      defaultCallOptions()
    );
    console.log(n1);
  }

  const n2 = 3;
  for (let i = 0; i < n2; i++) {
    await charlie.call(
      nft_contract,
      "nft_mint",
      {
        receiver_id: charlie,
        referrer_id: alice,
      },
      defaultCallOptions()
    );
    console.log(n2);
  }

  const referral_rank_for_user = await nft_contract.view(
    "referral_rank_for_user",
    {
      account_id: alice,
    }
  );
  console.log("referral_rank_for_user", referral_rank_for_user);

  const referral_count_for_user = await nft_contract.view(
    "referral_count_for_user",
    {
      account_id: alice,
    }
  );
  console.log("referral_count_for_user", referral_count_for_user);

  const leaderboard = await nft_contract.view("referrals_leaderboard", {});
  console.log("leaderboard", leaderboard);
});
