import { useFocusEffect } from '@react-navigation/native';
import { selectLocale } from '../../store/general';
import { getLocalizationIds } from '../locales';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useLocaledDocument = (getDocument, initialDocument) => {
  const locale = useSelector(selectLocale);

  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(initialDocument);

  useEffect(() => {
    setDocument(initialDocument);
  }, [initialDocument]);

  useFocusEffect(
    useCallback(() => {
      if (!locale || !document || locale === document.locale) return;

      const translatedEventId = getLocalizationIds(document)[locale];
      if (!translatedEventId) {
        setDocument(null);
        return;
      }

      let isSubscribed = true;
      setIsLoading(true);

      getDocument(translatedEventId, { locale })
        .then(newEvent => isSubscribed && setDocument(newEvent))
        .catch(console.warn)
        .finally(() => setIsLoading(false));

      return () => {
        isSubscribed = false;
        setIsLoading(false);
      };
    }, [locale, getDocument])
  );

  return [document, isLoading];
};

export default useLocaledDocument;
