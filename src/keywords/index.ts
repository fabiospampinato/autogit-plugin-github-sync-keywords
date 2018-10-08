
/* IMPORT */

import fetchKeywordsNPM from './npm';

/* FETCH KEYWORDS */

async function fetchKeywords ( repository: string ) {

  const fetchers = [fetchKeywordsNPM];

  for ( let fetcher of fetchers ) {

    const description = await fetcher ( repository );

    if ( description ) return description;

  }

}

/* EXPORT */

export default fetchKeywords;
