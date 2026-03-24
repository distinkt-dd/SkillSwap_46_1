import type { FC } from 'react';
import { Fragment, useState } from 'react';

import styles from './Catalog.module.css';
import { CardSkeleton } from './CardSkeleton/CardSkeleton';
import { CatalogList } from './CatalogList';
import { CatalogSectionedBlocks } from './CatalogSectionedBlocks';
import { AsideFilters } from '@widgets/aside-filters/ui';
import { useFilters } from '@features/filters';
import { CatalogActiveFilterChips } from './CatalogActiveFilterChips';

import { useCatalogInit } from '../model/hooks/useCatalogInit';
import { useCatalogViewModel } from '../model/hooks/useCatalogViewModel';

export const Catalog: FC = () => {
  useCatalogInit();
  const [filters, filterActions] = useFilters();
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);

  const {
    users,
    sectionBuckets,
    displayedCatalogItems,
    loading,
    lastElementRef,
    isAnyLoading,
    isInitialLoading,
    firstError,
    getCityName,
    buildSkillItem,
    getCanTeachData,
    getLikesCount,
    categories,
    subcategories,
    cities,
  } = useCatalogViewModel(filters);

  const [prevSectionBuckets, setPrevSectionBuckets] = useState(sectionBuckets);
  if (sectionBuckets !== prevSectionBuckets) {
    setPrevSectionBuckets(sectionBuckets);
    if (!sectionBuckets) {
      setShowAllPopular(false);
      setShowAllNew(false);
    }
  }

  if (isAnyLoading && isInitialLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const isEmptyResult = !isAnyLoading && !firstError && users.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {firstError && <div className={styles.errorBanner}>{firstError}</div>}
        <div className={styles.filters}>
          <AsideFilters
            categories={categories}
            subcategories={subcategories}
            cities={cities}
            filters={filters}
            actions={filterActions}
          />
        </div>

        <div className={styles.gridContainer}>
          {sectionBuckets ? (
            <CatalogSectionedBlocks
              popular={sectionBuckets.popular}
              newUsers={sectionBuckets.newUsers}
              recommendedItems={displayedCatalogItems}
              showAllPopular={showAllPopular}
              showAllNew={showAllNew}
              onTogglePopular={() => setShowAllPopular((v) => !v)}
              onToggleNew={() => setShowAllNew((v) => !v)}
              lastElementRef={lastElementRef}
              buildSkillItem={buildSkillItem}
              getCanTeachData={getCanTeachData}
              getCityName={getCityName}
              getLikesCount={getLikesCount}
            />
          ) : (
            <Fragment>
              <CatalogActiveFilterChips
                filters={filters}
                cities={cities}
                subcategories={subcategories}
                actions={filterActions}
              />
              <div className={styles.sectionHeaderRow}>
                <h2 className={styles.sectionHeading} id="catalog-filtered-heading">
                  Подходящие предложения: {users.length}
                </h2>
              </div>
              {isEmptyResult ? (
                <div className={styles.empty}>
                  <h2 className={styles.emptyTitle}>Карточки не найдены</h2>
                  <p className={styles.emptyText}>Попробуйте изменить фильтры или зайти позже.</p>
                </div>
              ) : (
                <CatalogList
                  items={displayedCatalogItems}
                  lastElementRef={lastElementRef}
                  buildSkillItem={buildSkillItem}
                  getCanTeachData={getCanTeachData}
                  getCityName={getCityName}
                  getLikesCount={getLikesCount}
                />
              )}
            </Fragment>
          )}

          {loading && (
            <div className={styles.skeletonGrid}>
              {[...Array(3)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
