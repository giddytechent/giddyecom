import { Hono } from 'hono'
import stripe from '../utils/stripe';
import { shouldBeUser } from '../middleware/authMiddleware';
import { CartItemsType } from '@repo/types';
import { getStripeProductPrice } from '../utils/stripeProduct';
const sessionRoute = new Hono()

sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {

  const { cart }: { cart: CartItemsType } = await c.req.json()
  const userId = c.get("userId")

  const lineItems = await Promise.all(
    cart.map(async (item)=>{
      const unitAmount = await getStripeProductPrice(item.id)
      return {
         price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount as number,
        },
        quantity: item.quantity,
      }
    })
  )
  try {
    const session = await stripe.checkout.sessions.create({

      line_items: lineItems,
      client_reference_id:userId,
      mode: 'payment',
      ui_mode: 'elements',
      return_url: 'http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}',
      // Provide a name (for example, embedded_web_0001) to label this Checkout integration and measure its conversion independently
    });

    return c.json({ client_secret: session.client_secret });

  } catch (error) {
    console.log(error)
    return c.json({ error: 'Failed to create checkout session' }, 500)
  }
});

export default sessionRoute
