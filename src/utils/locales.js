export const getLocalizationIds = strapiDocument => {
  const mappedLocalizations =
    strapiDocument?.localizations?.map(localizationData => [
      localizationData.locale,
      localizationData.id,
    ]) || [];
  return Object.fromEntries(mappedLocalizations);
};
