import Link from "next/link"

export default async function ReturnPage({ searchParams }: { searchParams: Promise<{ session_id: string }> | undefined }) {
    const session_id = (await searchParams)?.session_id

    if (!session_id) {
        return <div>No session id found</div>
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`)
    const data = await res.json()

    return (
        <div>
            <h1>Payment {data.status}</h1>
            <p>Payment Status {data.payment_status}</p>
            <Link href="/orders">See your orders</Link>
        </div>
    )
}