export type Tree = {
  id: number;
  tree_id: number;
  user_id: number;
  lat: number;
  long: number;
  nw_bounds: number[];
  se_bounds: number[];
  confidence: number;
  created_at: string;
};

export interface Prediction {
  id: number;
  user_id: number;
  prediction_id: number;
  center_coords: number[];
  image_url: string;
  coco_bbox: number[][];
  yolo_bbox: number[][];
  nw_bounds: number[];
  se_bounds: number[];
  confidence: number[];
  count: number;
  trees: Tree[];
  created_at: string;
}

export type TotalTrees = {
  total_trees?: number;
};
