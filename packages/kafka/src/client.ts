import { Kafka } from "kafkajs";

export const createKafkaClient = (service: string) => {
     return new Kafka({
        clientId: service,
        brokers: ["localhost:9094", "localhost:9095", "localhost:9096"],
    });
}

// import { Kafka } from "kafkajs";

// export const createKafkaClient = (service: string) => {
//       const configuredBrokers = process.env.KAFKA_BROKERS;
//       if (!configuredBrokers) {
//           throw new Error("KAFKA_BROKERS must be configured with comma-separated broker endpoints");
//       }

//       const brokers = configuredBrokers.split(",").map((broker) => broker.trim());
//       if (brokers.some((broker) => !broker)) {
//           throw new Error("KAFKA_BROKERS contains an empty broker endpoint");
//       }

//       const invalidBroker = brokers.find((broker) => {
//           try {
//                 const endpoint = new URL(`kafka://${broker}`);
//                 const port = Number(endpoint.port);

//                 return endpoint.username || endpoint.password || endpoint.pathname !== "" || endpoint.search || endpoint.hash ||
//                      !endpoint.hostname || !endpoint.port || !Number.isInteger(port) || port < 1 || port > 65535;
//           } catch {
//                 return true;
//           }
//       });

//       if (invalidBroker) {
//           throw new Error(`KAFKA_BROKERS contains an invalid broker endpoint: ${invalidBroker}`);
//       }

//      return new Kafka({
//         clientId: service,
//           brokers,
//     });
// }