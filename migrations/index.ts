import * as migration_20261013_154153_initial from './20261013_154153_initial';
import * as migration_20261013_154813_media from './20261013_154813_media';
import * as migration_20261013_155219 from './20261013_155219';
import * as migration_20261013_155730_media_prefix from './20261013_155730_media_prefix';
import * as migration_20261013_190540_roles from './20261013_190540_roles';

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
    name: '20261013_190540_roles'
  },
];
