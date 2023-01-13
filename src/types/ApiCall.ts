export interface Tree {
	user_id: number
	lat: number
	long: number
	nw_bounds: number[]
	se_bounds: number[]
	confidence: number
}

export interface Prediction {
	user_id: number
	image_url: string
	coco_bbox: number[][]
	yolo_bbox: number[][]
	confidence: number[]
	count: number
	trees: Tree[]
}
