import { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId:string) => {
     const consumer:Consumer = kafka.consumer({groupId})
     let isRunning = false

     const connect = async () =>{
         await consumer.connect()
         console.log("Kafka consumer connected:" + groupId)
     }

  const subscribe = async (
    topic: string | string[],
    handler: (message:any, topicName:string) => Promise<void>
  ) => {
    if (isRunning) {
      return
    }

    const topics = Array.isArray(topic) ? topic : [topic]

    await consumer.subscribe({
      topics,
      fromBeginning: true
    })

    isRunning = true

    await consumer.run({
      eachMessage: async ({ topic: topicName, partition, message}) =>{
        try {
          const value = message.value?.toString()

          if(value){
            await handler(JSON.parse(value), topicName)
          }
        } catch (error) {
          console.log("Error processing message", error)
          throw error
        }
      }
    })
  }
    
     const disconnect = async () =>{
        await consumer.disconnect()
    }

    return {connect, subscribe, disconnect}
}

