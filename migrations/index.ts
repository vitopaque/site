import * as migration_20261013_154153_initial from './20261013_154153_initial';
import * as migration_20261013_154813_media from './20261013_154813_media';
import * as migration_20261013_155219 from './20261013_155219';
import * as migration_20261013_155730_media_prefix from './20261013_155730_media_prefix';
import * as migration_20261013_190540_roles from './20261013_190540_roles';
import * as migration_20261014_135113_site_settings from './20261014_135113_site_settings';
import * as migration_20261014_135740_services from './20261014_135740_services';
import * as migration_20261014_144123_drop_page_models from './20261014_144123_drop_page_models';

export const migrations = [
  {
    up: migration_20261013_154153_initial.up,
    down: migration_20261013_154153_initial.down,
    name: '20261013_154153_initial',
  },
  {
    up: migration_20261013_154813_media.up,
    down: migration_20261013_154813_media.down,
    name: '20261013_154813_media',
  },
  {
    up: migration_20261013_155219.up,
    down: migration_20261013_155219.down,
    name: '20261013_155219',
  },
  {
    up: migration_20261013_155730_media_prefix.up,
    down: migration_20261013_155730_media_prefix.down,
    name: '20261013_155730_media_prefix',
  },
  {
    up: migration_20261013_190540_roles.up,
    down: migration_20261013_190540_roles.down,
    name: '20261013_190540_roles',
  },
  {
    up: migration_20261014_135113_site_settings.up,
    down: migration_20261014_135113_site_settings.down,
    name: '20261014_135113_site_settings',
  },
  {
    up: migration_20261014_135740_services.up,
    down: migration_20261014_135740_services.down,
    name: '20261014_135740_services',
  },
  {
    up: migration_20261014_144123_drop_page_models.up,
    down: migration_20261014_144123_drop_page_models.down,
    name: '20261014_144123_drop_page_models'
  },
];
