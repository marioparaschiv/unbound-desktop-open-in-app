import { Switch } from '@components/settings';
import Services from '../services.json';
import React from 'react';

export default ({ settings }: { settings: SettingsStore; }) => {
   return Services.map(service =>
      <Switch
         title={service.name}
         checked={settings.get(service.name, true)}
         onChange={v => settings.set(service.name, v)}
      />
   );
};