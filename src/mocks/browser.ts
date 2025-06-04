/**
 * 🚀 CUSTOM GRAPHQL INTERCEPTOR
 * 
 * Bypassing MSW completely due to internal cookie errors
 */

import { mockOrders } from './mockData'
import type { OrderStatus } from '../types/order'

// Custom GraphQL interceptor that actually works
const setupGraphQLInterceptor = () => {
  console.log('🔧 [INTERCEPTOR] Setting up custom GraphQL interceptor...')

  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();

    // Intercept GraphQL requests
    if (url.includes('/graphql') || url === '/graphql') {
      try {
        const body = JSON.parse(init?.body as string);
        const { query, variables, operationName } = body;

        console.log('🔍 [INTERCEPTOR] GraphQL request intercepted')
        console.log('📝 [INTERCEPTOR] Operation:', operationName)
        console.log('📝 [INTERCEPTOR] Variables:', variables)

        // Handle GetOrders
        if (operationName === 'GetOrders' || query.includes('GetOrders')) {
          const { status, provider } = variables || {}
          let filteredOrders = [...mockOrders]

          if (status) {
            console.log(`🔍 [INTERCEPTOR] Filtering by status: ${status}`)
            filteredOrders = filteredOrders.filter(order => order.status === status)
          }
          if (provider) {
            console.log(`🔍 [INTERCEPTOR] Filtering by provider: ${provider}`)
            filteredOrders = filteredOrders.filter(order => order.provider === provider)
          }

          console.log(`📊 [INTERCEPTOR] Returning ${filteredOrders.length} orders`)

          return new Response(JSON.stringify({
            data: { orders: filteredOrders }
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Handle GetOrder
        if (operationName === 'GetOrder' || query.includes('GetOrder')) {
          const order = mockOrders.find(o => o.id === variables?.id);
          console.log(`🔍 [INTERCEPTOR] GetOrder for ID: ${variables?.id}, found: ${!!order}`)

          return new Response(JSON.stringify({
            data: { order: order || null }
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Handle UpdateOrderStatus
        if (operationName === 'UpdateOrderStatus' || query.includes('UpdateOrderStatus')) {
          const orderIndex = mockOrders.findIndex(o => o.id === variables?.id);
          if (orderIndex >= 0) {
            const oldStatus = mockOrders[orderIndex].status
            mockOrders[orderIndex] = { ...mockOrders[orderIndex], status: variables?.status as OrderStatus };
            console.log(`✅ [INTERCEPTOR] Updated order ${mockOrders[orderIndex].reference}: ${oldStatus} → ${variables?.status}`)
            return new Response(JSON.stringify({
              data: { updateOrderStatus: mockOrders[orderIndex] }
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }

        return new Response(JSON.stringify({
          errors: [{ message: 'Unknown GraphQL operation' }]
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('❌ [INTERCEPTOR] Error processing GraphQL request:', error);
        return new Response(JSON.stringify({
          errors: [{ message: 'Request processing error' }]
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // For non-GraphQL requests, use original fetch
    return originalFetch(input, init);
  };

  console.log('✅ [INTERCEPTOR] Custom GraphQL interceptor ready')
}

export const startMSW = async (): Promise<void> => {
  console.log('🚀 [INTERCEPTOR] Starting custom GraphQL interceptor (MSW bypass)...')
  setupGraphQLInterceptor()
  console.log('✅ [INTERCEPTOR] GraphQL interception active!')
}

export const stopMSW = async (): Promise<void> => {
  console.log('🛑 [INTERCEPTOR] Custom interceptor cannot be stopped (refresh page)')
}

// Dummy exports for compatibility
export const worker = {
  start: startMSW,
  stop: stopMSW
}