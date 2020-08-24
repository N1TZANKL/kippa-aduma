import PageLayout from "components/PageLayout";
import ChatBubble from "components/ChatBubble";

const Chat = () => (
    <PageLayout>
        <ChatBubble
            message={{
                type: "text",
                message: "just a test\nlalalalla\nlalalla",
                color: "red",
                nickname: "nitz",
                timestamp: new Date().toISOString(),
            }}
        />
        <ChatBubble
            message={{
                type: "file",
                message: "thisisalongfilenameohmygoddddditsgonnaoverflow.tar.gz",
                fileSize: 3201230,
                color: "red",
                nickname: "nitz",
                timestamp: new Date().toISOString(),
                fileType: "tar.gz",
            }}
        />
    </PageLayout>
);
export default Chat;
