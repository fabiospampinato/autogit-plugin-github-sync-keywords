
/* IMPORT */

import * as path from 'path';

/* FETCH KEYWORDS NPM */

async function fetchKeywordsNPM ( repository: string ) {

  const pkgPath = path.join ( repository, 'package.json' );

  try {

    const pkg = require ( pkgPath );

    return pkg.keywords;

  } catch ( e ) {}

}

/* EXPORT */

export default fetchKeywordsNPM;
