import { ReactNode } from "react"

export function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <div className='page-container'>
      <div className='content'>
        {children}
      </div>
    </div>
  )
}
