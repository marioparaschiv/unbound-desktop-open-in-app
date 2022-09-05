import { bulk, filters } from '@webpack';
import Plugin from '@entities/plugin';

import Settings from './components/Settings';
import Services from './services.json';

const [
   Anchor,
   Copy
] = bulk(
   filters.byDisplayName('Anchor', false),
   filters.byProps('asyncify', 'copy')
);

export default class extends Plugin {
   start() {
      this.patcher.before(Anchor, 'default', (_, args, res) => {
         const { href } = args[0] || {};

         if (href) {
            const link = href.toLowerCase();

            for (const service of Services) {
               if (this.settings.get(service.name, true) && service.links.some(l => ~link.indexOf(l))) {
                  if (!link.includes(service.identifier)) args[0].href = `${service.identifier}${args[0].href}`;
               }
            }
         }

         return args;
      });

      this.patcher.before(Copy, 'copy', (_, [link], res) => {
         for (const service of Services) {
            if (this.settings.get(service.name, true) && service.links.some(l => ~link.indexOf(l))) {
               link = link.replace(service.identifier, '');
            }
         }

         return [link];
      });
   }

   getSettingsPanel() {
      return Settings;
   }
}