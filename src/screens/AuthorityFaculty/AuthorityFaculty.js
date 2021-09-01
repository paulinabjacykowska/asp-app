import DepartmentAuthorityIcon from '../../../assets/svg/faculty_authority.svg';
import { findImageUrisWithBestQuality } from '../../utils/imagesHelpers';
import ContentLoadingAnim from '../../components/ContentLoadingAnim';
import StripeSwitchBoard from '../../components/StripeSwitchBoard';
import * as screenNames from '../../constants/screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale } from '../../store/general';
import { STATES } from '../../utils/stateMachine';
import { ScrollView } from 'react-native';
import RowAuthority from './RowAuthority';
import React, { useEffect } from 'react';
import {
  removeFacultyStuff,
  selectFacultyStuff,
  fetchFacultyStuff,
} from '../../store/facultyStuff';

export default function AuthorityFaculty({ navigation }) {
  const { facultyStuff, loading } = useSelector(selectFacultyStuff);
  const locale = useSelector(selectLocale);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!locale) return;
    if (locale !== facultyStuff?.locale) {
      dispatch(removeFacultyStuff());
    }

    return dispatch(fetchFacultyStuff()).abort;
  }, [locale]);

  if (!facultyStuff || loading === STATES.pending) {
    return <ContentLoadingAnim />;
  }

  return (
    <ScrollView>
      <StripeSwitchBoard
        title={'władze wydziału'}
        IconPrep={DepartmentAuthorityIcon}
      />

      {facultyStuff.faculty_authorities
        ?.filter(({ worker }) => !!worker)
        .map(({ worker, worker_title }) => (
          <RowAuthority
            key={worker.id}
            title={worker.position}
            email={worker.email}
            subtitle={worker.full_name}
            photoUri={findImageUrisWithBestQuality(worker)[0]}
            onPress={() =>
              navigation.navigate(screenNames.WORKER_SCREEN, {
                workerTitle: worker_title,
                worker,
              })
            }
          />
        ))}

      <StripeSwitchBoard
        title="kierownicy katedr"
        isBlue={true}
        IconPrep={DepartmentAuthorityIcon}
      />
      {facultyStuff.heads_of_departments
        ?.filter(({ worker }) => !!worker)
        .map(({ worker, worker_title }) => (
          <RowAuthority
            key={worker.id}
            title={worker.position}
            email={worker.email}
            subtitle={worker.full_name}
            photoUri={findImageUrisWithBestQuality(worker)[0]}
            isBlueStripe
            onPress={() =>
              navigation.navigate(screenNames.WORKER_SCREEN, {
                workerTitle: worker_title,
                worker,
              })
            }
          />
        ))}
    </ScrollView>
  );
}
