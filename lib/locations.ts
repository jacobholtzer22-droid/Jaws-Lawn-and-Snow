import { site } from "@/site.config";

type Location = (typeof site.locations)[number];

const inTowns = (loc: Location, city: string) =>
  (loc.towns as readonly string[]).includes(city);

/** Gallery photos whose recorded `city` belongs to this location. */
export function locationPhotos(loc: Location) {
  return site.work.photos.filter((p) => p.city && inTowns(loc, p.city));
}

export function locationPairs(loc: Location) {
  return site.beforeAfter.filter((p) => p.city && inTowns(loc, p.city));
}

/**
 * A location page is indexable only once it has real local proof. Until then it
 * stays live for visitors but noindexed and out of the sitemap.
 */
export function locationHasProjects(loc: Location) {
  return locationPhotos(loc).length > 0 || locationPairs(loc).length > 0;
}
