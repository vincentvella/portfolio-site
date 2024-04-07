import { MetadataRoute } from 'next'

const domains = ["vincevella.com", "vincentvella.me"]

export default function sitemap(): MetadataRoute.Sitemap {
	return domains.flatMap((domain: string) => ([
		{
			url: `https://${domain}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `https://${domain}/resume`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `https://${domain}/projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
	]))
}
