import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'

export default function NotionPage({pageData, fullPage}) {
  const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection
        )
    )
  const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
        {
        ssr: false
        }
    )
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
        {
        ssr: false
        }
    )

    return (
            <NotionRenderer 
                recordMap={pageData} 
                fullPage={fullPage} 
                darkMode={true}
                components={{
                    nextImage: Image,
                    nextLink: Link,
                    Collection,
                    Modal,
                    Pdf  
                  }} 
            />
        )
}
