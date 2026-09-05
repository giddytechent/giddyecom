import { createKafkaClient, createProducer } from "@repo/kafka"

const kafka = createKafkaClient("email-services")
export const producer = createProducer(kafka)