import { TransformToMeiliSearchParams } from '../types'
import { mergeFiltersAndNumericFilters } from './to-meilisearch-filters'

export const transformToMeiliSearchParams: TransformToMeiliSearchParams = function (
  {
    query,
    facets,
    facetFilters,
    attributesToSnippet: attributesToCrop,
    attributesToRetrieve,
    attributesToHighlight,
    filters = '',
    numericFilters = [],
  },
  { paginationTotalHits, placeholderSearch }
) {
  const limit = paginationTotalHits
  const filter = mergeFiltersAndNumericFilters(filters, numericFilters)

  // Creates search params object compliant with MeiliSearch
  return {
    q: query,
    ...(facets?.length && { facetsDistribution: facets }),
    ...(facetFilters && { facetFilters }),
    ...(attributesToCrop && { attributesToCrop }),
    ...(attributesToRetrieve && { attributesToRetrieve }),
    ...(filter && { filters: filter }),
    attributesToHighlight: attributesToHighlight || ['*'],
    limit: (!placeholderSearch && query === '') || !limit ? 0 : limit,
  }
}
