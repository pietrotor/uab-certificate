import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Registros',
          route: '/dashboard',
          children: [
            { label: 'Estudiantes', route: '/dashboard/nfts' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
      ],
    },
    {
      group: 'Reportes',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Reporte de estudiantes por carrera',
          route: '/download',
        },
      ],
    },
  ];
}
