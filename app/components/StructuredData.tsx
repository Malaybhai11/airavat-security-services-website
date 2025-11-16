export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://airavatsecurity.in';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIRAVAT Security Service',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Premier security solutions provider offering 24/7 protection across Gujarat with trained ex-servicemen professionals.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, Akash Complex, Nilkamal Chowk, Khodiyar Colony',
      addressLocality: 'Jamnagar',
      addressRegion: 'Gujarat',
      postalCode: '361006',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9426865263',
      contactType: 'Customer Service',
      email: 'airavats1@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'gu'],
    },
    sameAs: [],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Security Services',
    provider: {
      '@type': 'Organization',
      name: 'AIRAVAT Security Service',
    },
    areaServed: {
      '@type': 'State',
      name: 'Gujarat',
    },
    description: 'Professional security solutions including security guards, CCTV operators, advanced security equipment, and comprehensive protection services across Gujarat.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

