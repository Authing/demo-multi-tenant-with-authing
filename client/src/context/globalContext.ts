import { User } from '@authing/react-ui-components'
import React from 'react'
import { Tenant } from '../api/tenant'

export interface IGlobalContext {
  user: User | undefined
  tenant: Tenant | undefined
}

export const GlobalContext = React.createContext<IGlobalContext>({
  user: undefined,
  tenant: undefined,
})
