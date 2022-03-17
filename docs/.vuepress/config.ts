import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { sidebarZh, sidebarEn } from '../.vuepress/configs/siderbar/zh'
import { copyCode } from "vuepress-plugin-copy-code2";
import { comment } from "vuepress-plugin-comment2";

export default defineUserConfig<DefaultThemeOptions>({
	base: '/',
	head: [
		['meta', { name: 'referrer', content: 'no-referrer' }],
	],
	locales: {
		'/': {
			lang: 'en-US',
		},
		'/zh/': {
			lang: 'zh-CN',
		},
	},
	// 站点配置
	lang: 'zh-CN',
	title: 'gyfly.top',
	description: '随便写写',
	theme: '@vuepress/theme-default',
	themeConfig: {
		contributors: false,
		lastUpdated: true,
		lastUpdatedText: '上次更新',
		logo: '/images/logo.png',
		locales: {
			'/': {
				sidebar: sidebarEn,
				navbar: []
			},
			'/zh/': {
				sidebar: sidebarZh,
				navbar: [
					{
						text: '技术相关',
						link: '/zh/skill/front/',
					},
					{
						text: '美文推荐',
						link: '/zh/collect',
					},
					{
						text: '其他',
						link: '/zh/other/',
					},
					{
						text: '休闲娱乐',
						children: [
							{
								text: '更新日志',
								link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
							},
						]
					}
				],

				// 404 page
				notFound: [
					'这里什么都没有',
					'我们怎么到这来了？',
					'这是一个 404 页面',
					'看起来我们进入了错误的链接',
				],
				backToHome: '返回首页',

				selectLanguageName: '简体中文',
				selectLanguageText: '选择语言',
				selectLanguageAriaLabel: '选择语言',

			},
		},
	},
	plugins: [
		['@vuepress/nprogress', true],
		['@vuepress/back-to-top', true],
		copyCode({
			showInMobile: true,
			pure: false,
			locales: {
				'/zh/': {
					copy: "复制成功 🎉",
					hint: "复制代码",
				}
			}
		}),
		comment({
			type: "waline",
			comment: true,
			login: 'disable',
			serverURL: 'https://gyfly-top-b3bn289s5-mineminego.vercel.app/',
			wordLimit: 100,
		})
	]
})
