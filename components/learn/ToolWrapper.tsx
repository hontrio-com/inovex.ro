'use client'

import dynamic from 'next/dynamic'

const CostCalculatorMagazin = dynamic(
  () => import('./tools/CostCalculatorMagazin').then((m) => m.CostCalculatorMagazin),
  { ssr: false, loading: () => <ToolSkeleton /> }
)
const CostCalculatorWebsite = dynamic(
  () => import('./tools/CostCalculatorWebsite').then((m) => m.CostCalculatorWebsite),
  { ssr: false, loading: () => <ToolSkeleton /> }
)
const ChecklistLansareMagazin = dynamic(
  () => import('./tools/ChecklistLansareMagazin').then((m) => m.ChecklistLansareMagazin),
  { ssr: false, loading: () => <ToolSkeleton /> }
)
const SeoAuditChecker = dynamic(
  () => import('./tools/SeoAuditChecker').then((m) => m.SeoAuditChecker),
  { ssr: false, loading: () => <ToolSkeleton /> }
)

function ToolSkeleton() {
  return (
    <div
      style={{
        background: '#F8FAFB',
        border: '1px solid #E8ECF0',
        borderRadius: 16,
        padding: 32,
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: '#8A94A6',
      }}
    >
      Se incarca tool-ul...
    </div>
  )
}

export function ToolWrapper({ toolKey }: { toolKey: string }) {
  switch (toolKey) {
    case 'CostCalculatorMagazin':
      return <CostCalculatorMagazin />
    case 'CostCalculatorWebsite':
      return <CostCalculatorWebsite />
    case 'ChecklistLansareMagazin':
      return <ChecklistLansareMagazin />
    case 'SeoAuditChecker':
      return <SeoAuditChecker />
    default:
      return (
        <div
          style={{
            background: '#FFF5F5',
            border: '1px solid #FECACA',
            borderRadius: 12,
            padding: 24,
            fontFamily: 'var(--font-body)',
            color: '#EF4444',
            textAlign: 'center',
          }}
        >
          Tool indisponibil momentan.
        </div>
      )
  }
}
