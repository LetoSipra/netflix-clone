
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import payments from '../stripe'

function useSubscribe(user: User | null) {
  const [subscribe, setSubscribe] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscribe(
        snapshot.subscriptions.filter(
          (subscribe) =>
            subscribe.status === 'active' ||
            subscribe.status === 'trialing'
        )[0]
      )
    })
  }, [user])

  return subscribe
}

export default useSubscribe;
