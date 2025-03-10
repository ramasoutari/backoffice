// @mui
import {
  Container,
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
} from "@mui/material";
// hooks
import { useRouter, useSearchParams } from "src/routes/hooks";
import { useLocales } from "src/locales";
import { useSettingsContext } from "src/components/settings";
// components
import Table, { useTable } from "src/components/table";
import { StyledActionButton } from "src/components/custom-styled-components";
import Label from "src/components/label/label";
//
import { NotificationType, ROWS_PER_PAGE_OPTIONS } from "src/config-global";
import moment from "moment-timezone";
// import {
//   useGetUserNotifications,
//   useMarkNotificationsAsRead,
//   useMarkNotificationsAsUnread,
// } from 'src/api/notifications.api';
import { useFilters } from "src/hooks/use-filters";
import FilterResults from "src/components/filter-results";
import { getNotificationStatusStyles } from "src/sections/tasks/view/utils";
import { paths } from "src/routes/paths";
import { useNotification } from "src/providers/notifications.provider";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function NotificationsListView() {
  const { t } = useLocales();
  const router = useRouter();
  const settings = useSettingsContext();
  const { notificationTrigger } = useNotification();
  const { searchParams, changeSearchParam, setSearchParams } =
    useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const rowsPerPage = searchParams.get("rows") || ROWS_PER_PAGE_OPTIONS[0];
  const sortBy = searchParams.get("sortBy");
  const sort = searchParams.get("sort");
  const { filters, handleChangeFilter } = useFilters();
  // const setNotificationsAsRead = useMarkNotificationsAsRead();
  // const setNotificationsAsUnread = useMarkNotificationsAsUnread();

  // const getNotifications = useGetUserNotifications({
  //   page: currentPage,
  //   pageSize: rowsPerPage,
  //   filters,
  //   sortBy,
  //   sort,
  // });
  const table = useTable({
    defaultDense: false,
    defaultOrder: "asc",
    defaultOrderBy: "id",
    defaultCurrentPage: 0,
    defaultRowsPerPage: ROWS_PER_PAGE_OPTIONS[0],
    defaultSelected: [],
  });

  useEffect(() => {
    table.setSelected([]);
  }, [filters]);

  // const onGoToCaseTask = (row) => {
  //   // Set notification as read
  //   onSetAsReadClick([row.id]);

  //   // Redirect to case task
  //   router.push(paths.dashboard.tasks.root, {
  //     query: {
  //       taskId: row?.data?.caseTaskId,
  //     },
  //   });
  // };

  // const goToCaseProfile = (row) => {
  //   // Set notification as read
  //   onSetAsReadClick([row.id]);

  //   // Redirect to profile
  //   router.push(
  //     paths.dashboard.investigationProfile.savedProfile(
  //       row?.data?.investigationProfileId
  //     )
  //   );
  // };

  // const goToSavedProfile = (row) => {
  //   // Set notification as read
  //   onSetAsReadClick([row.id]);

  //   // Redirect to profile
  //   router.push(
  //     paths.dashboard.investigationProfile.savedProfile(
  //       row?.data?.investigationProfileId
  //     )
  //   );
  // };

  const renderNotificationActions = (row) => {
    return (
      <Stack direction="row" spacing={1}>
        {/* {[
          NotificationType.CASE_SYSTEM_CREATED_TASK,
          NotificationType.ASSIGN_CASE_TASK,
          NotificationType.SEND_BACK_CASE_TASK,
        ].includes(row.type) && (
          <StyledActionButton
            onClick={() => onGoToCaseTask(row)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            {t('go_to_task')}
          </StyledActionButton>
        )} */}
        {/* {[NotificationType.INVESTIGATION_PROFILE_CREATED_FOR_CASE_TASK].includes(row.type) && (
          <StyledActionButton
            onClick={() => goToCaseProfile(row)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            {t('go_to_profile')}
          </StyledActionButton>
        )} */}
        {/* {[NotificationType.NEW_WEALTH_CHANGE_RECORDED].includes(row.type) && (
          <StyledActionButton
            onClick={() => goToSavedProfile(row)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            {t('go_to_profile')}
          </StyledActionButton>
        )} */}
      </Stack>
    );
  };

  // ** Vars
  const columns = [
    {
      id: "message",
      label: t("notification"),
      minWidth: 500,
      renderRow: (row, column) => (
        <Stack direction="column" spacing={1}>
          <Typography variant="body2" flexWrap>
            {row.message}
          </Typography>
          {renderNotificationActions(row)}
        </Stack>
      ),
    },
    {
      id: "created_at",
      label: t("date_and_time"),
      sortable: true,
      minWidth: 150,
      align: "right",
      renderRow: (row) => (
        <Typography variant="body2" noWrap>
          {moment(row.created_at).format("YYYY-MM-DD - HH:mm")}
        </Typography>
      ),
    },
    {
      id: "isRead",
      label: t("status"),
      sortable: true,
      minWidth: 100,
      align: "right",
      renderRow: (row, column) => (
        <Label
          variant="ghost"
          sx={{
            ...getNotificationStatusStyles(row.isRead ? "READ" : "UNREAD"),
          }}
        >
          {row.isRead ? t("read") : t("not_read")}
        </Label>
      ),
    },
    // {
    //   type: 'actions',
    //   label: t('action'),
    //   align: 'center',
    //   minWidth: 180,
    // },
  ];

  const availableFilters = [
    {
      key: "created_at",
      label: t("date_and_time"),
      type: "date",
      range: true,
      defaultValue: "",
    },
  ];

  // const onSetAsReadClick = (ids) => {
  //   setNotificationsAsRead.mutateAsync({
  //     ids,
  //   });
  //   table.setSelected([]);
  // };

  // const onSetAsUnreadClick = (ids) => {
  //   setNotificationsAsUnread.mutateAsync({
  //     ids,
  //   });
  //   table.setSelected([]);
  // };

  // useEffect(() => {
  //   if (notificationTrigger) {
  //     getNotifications.refetch();
  //   }
  // }, [notificationTrigger]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mt: 4,
          }}
        >
          <CardHeader title={t("notifications_center")} />
          <Stack direction="row" spacing={1}>
            <FilterResults
              filters={availableFilters}
              values={filters || {}}
              changeFilter={handleChangeFilter}
              width={450}
            />
          </Stack>
        </Box>
        {/* <Table
          {...table}
          columns={columns}
          rows={getNotifications?.data?.data || []}
          enableSelection={true}
          renderSelectedActions={(selected) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <StyledActionButton
                  onClick={() => onSetAsReadClick(selected)}
                  loading={setNotificationsAsRead.isPending}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  {t('setAsRead')}
                </StyledActionButton>
                <StyledActionButton
                  onClick={() => onSetAsUnreadClick(selected)}
                  loading={setNotificationsAsRead.isPending}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  {t('setAsNotRead')}
                </StyledActionButton>
              </Box>
            );
          }}
          // renderActions={(row) => {
          //   return (
          //     <Box
          //       sx={{
          //         display: 'flex',
          //         flexDirection: 'column',
          //         alignItems: 'center',
          //         justifyContent: 'center',
          //         flexWrap: 'wrap',
          //         gap: 1,
          //       }}
          //     >
          //       {!row.isRead ? (
          //         <StyledActionButton
          //           onClick={() => onSetAsReadClick([row.id])}
          //           loading={setNotificationsAsRead.isPending}
          //           variant="outlined"
          //           color="secondary"
          //           size="small"
          //           fullWidth
          //         >
          //           {t('setAsRead')}
          //         </StyledActionButton>
          //       ) : (
          //         <StyledActionButton
          //           onClick={() => onSetAsUnreadClick([row.id])}
          //           loading={setNotificationsAsRead.isPending}
          //           variant="outlined"
          //           color="secondary"
          //           size="small"
          //           fullWidth
          //         >
          //           {t('setAsNotRead')}
          //         </StyledActionButton>
          //       )}
          //     </Box>
          //   );
          // }}
          pagination={{
            ...(currentPage &&
              rowsPerPage && {
                page: parseInt(currentPage),
                rowsPerPage: parseInt(rowsPerPage),
                total: getNotifications?.data?.total,
                rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
                onChangePage: (page) => {
                  changeSearchParam('page', page);
                  table.setSelected([]);
                },
                onChangeRowsPerPage: (val) => {
                  setSearchParams({
                    page: 1,
                    rows: val,
                  });
                  table.setSelected([]);
                },
              }),
          }}
          order={sort}
          orderBy={sortBy}
          onSort={(sortBy, sort) => {
            setSearchParams({
              sortBy,
              sort,
            });
          }}
          loading={getNotifications?.isFetching}
        /> */}
      </Card>
    </Container>
  );
}
