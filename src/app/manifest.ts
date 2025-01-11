import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WhenToDo',
    short_name: 'WhenToDo',
    description:
      'A simple task scheduler that takes driving time and weather into account',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
