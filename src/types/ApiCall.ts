export interface Prediction {
	user_id: number
	image_url: string
	coco_bbox: number[][]
	yolo_bbox: number[][]
	confidence: number[]
	count: number
}
