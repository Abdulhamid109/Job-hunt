// here we will be creating our isolated AgentKit Server/Background Workers

import { createNetwork } from "@inngest/agent-kit";
import { createServer } from "@inngest/agent-kit/server";

const network = createNetwork({
    name:"JobHunt Network",
    agents:[]
});



const server = createServer({
    networks:[network]
});

server.listen(3010, () => console.log("Agent kit running!"));
