interface ICommonParams {
	format?: "html" | "json" | "xml" | "jsonv2"
	json_callback?: string
	accept_language?: string
	"accept-language"?: string
	addressdetails?: 0 | 1
	extratags?: 0 | 1
	namedetails?: 0 | 1
	email?: string
	debug?: 0 | 1
	endpoint?: string // custom open street map endpoint
}

// from: https://wiki.openstreetmap.org/wiki/Nominatim#Parameters_2
export interface ISearchParams extends ICommonParams {
	q: string
	street?: string
	city?: string
	state?: string
	country?: string
	viewbox?: string
	postalcode?: string
	countryCodesArray?: string[]
	countrycodes?: string
	bounded?: 0 | 1
	polygon?: 0 | 1
	email?: string
	exclude_place_ids?: string
	limit?: number
	dedupe?: 0 | 1
}

export interface IAddress {
	house_number?: string
	road?: string
	neighbourhood?: string
	suburb?: string
	postcode?: string
	city: string
	city_district?: string
	county?: string
	state: string
	country: string
	country_code: string
	continent?: string
	public_building?: string
	attraction?: string
	pedestrian?: string
	peak?: string
	bakery?: string
	electronics?: string
	construction?: string
}

export interface ISearchResult {
	place_id: string
	osm_id: string
	osm_type: PlaceTypeLabel
	boundingbox?: string[4]
	lat: string
	lon: string
	display_name: string
	class: string
	type: string
	importance: number
	icon: string
	address: IAddress
	licence: string
	svg?: string
}

// For backward compatibility
export type INominatimResult = ISearchResult

const PLACES_TYPES = {
	node: "N" as "N",
	way: "W" as "W",
	relation: "R" as "R",
}

type Places = typeof PLACES_TYPES
type PlaceTypeLabel = keyof Places
type PlaceTypeId = Places[PlaceTypeLabel]

export interface IOsmId {
	type: PlaceTypeLabel
	id: number
}
