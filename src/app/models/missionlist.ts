export interface Mission {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;

  rocket: {
    rocket_name: string;
    rocket_type: string;
  } | null;

  launch_site: {
    site_name_long: string;
  } | null;
  
  launch_success: boolean | null;
  land_success: boolean | null;

  links: {
    mission_patch_small: string | null;
    article_link: string | null;
    wikipedia: string | null;
    video_link: string | null;
  } | null;
}