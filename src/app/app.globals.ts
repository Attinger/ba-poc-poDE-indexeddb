//
// ===== File app.globals.ts
//
'use strict';

//@ts-ignore
import Localbase from 'localbase'

export const db = new Localbase('db');

db.config.debug = false
