import 'node'
import 'react'
import 'react-dom'
import 'vite/client'
import 'vite-plugin-svgr/client'
interface ImportMetaEnv {
	readonly VITE_APP_BASENAME: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

type CommonObjectType<T = any> = Record<string, T>

type RefType = MutableRefObject<unknown> | ((instance: unknown) => void)

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly PUBLIC_URL: string
	}
}

declare module '*.avif' {
	const src: string
	export default src
}

declare module '*.bmp' {
	const src: string
	export default src
}

declare module '*.gif' {
	const src: string
	export default src
}

declare module '*.jpg' {
	const src: string
	export default src
}

declare module '*.jpeg' {
	const src: string
	export default src
}

declare module '*.png' {
	const src: string
	export default src
}

declare module '*.webp' {
	const src: string
	export default src
}

declare module '*.svg' {
	import * as React from 'react'

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>

	const src: string
	export default src
}

declare module '*.module.css' {
	const classes: { readonly [key: string]: string }
	export default classes
}

declare module '*.module.scss' {
	const classes: { readonly [key: string]: string }
	export default classes
}

declare module '*.module.sass' {
	const classes: { readonly [key: string]: string }
	export default classes
}
