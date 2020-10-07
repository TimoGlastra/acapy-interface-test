import {
  BasicmessageApi,
  ConnectionApi,
} from "@ula-aca/aries-cloudagent-interface";

const connectionAlice = new ConnectionApi({
  basePath: "http://localhost:6002",
});

const connectionFaber = new ConnectionApi({
  basePath: "http://localhost:7002",
});

const basicMessageAlice = new BasicmessageApi({
  basePath: "http://localhost:6002",
});

const basicMessageFaber = new BasicmessageApi({
  basePath: "http://localhost:7002",
});

async function run() {
  const invitation = await connectionAlice.connectionsCreateInvitationPost(
    "Faber",
    true
  );

  const connection = await connectionFaber.connectionsReceiveInvitationPost(
    "Alice",
    true,
    invitation.data.invitation
  );

  await basicMessageFaber.connectionsConnIdSendMessagePost(
    connection.data.connection_id!,
    {
      content: "Hello Alice",
    }
  );
}

run();
