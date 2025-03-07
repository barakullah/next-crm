"use client";
import { EditOutlined, DownloadOutlined } from "@ant-design/icons";
import { Pagination, Tag } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import refresh from "../../../public/images/refresh.svg";
import { fetcher } from "../../lib/api";
import ImportModal from "../components/ImportModal";
import AddNewModal from "../components/Modal";
import {
  setFiltersValue,
  setLeadsListRedux,
} from "../reducer/leadsDetailsSlice";
import { persistor, RootState } from "../store";
import { debounce } from "lodash";
import { debug } from "console";
import SkeletonLoader from "./SkeletonLoader";
export default function Home() {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: RootState) => state.leadsDetails.filtersArray
  );
  const leadsListForSearch = useSelector(
    (state: RootState) => state.leadsDetails.leadsListRedux
  );
  const hasPageRendered = useRef(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [showPagination, setShowPaginagion] = useState(true);
  const [leadsList, setLeadsList]: any = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [resultsToShow, setResultsToShow] = useState([]);
  const [filtersArrayLocal, setFiltersArray]: any = useState([]);
  const [searchFieldValue, setSearchFieldValue]: any = useState({
    first_name: "",
    email: "",
    mobile: "",
    referral: "",
    event_name: "",
    sales: "",
  });
  const downloadBtn = useRef<HTMLAnchorElement>(null);
  const [emailSearchQuery, setEmailSearchQuery] = useState(null);
  const history = useRouter();

  const debouncedDispatch = debounce((query: any) => {
    dispatch(setFiltersValue(query));
  }, 200);
  const getLeadsList = async (limit: number, from: number) => {
    try {
      setSkeletonLoading(true);
      const data: any = await fetcher("/leads_list", {
        id: Cookies.get("userData"),
        limit,
        from,
      });
      setLeadsList(data?.data);
      setResultsToShow(data?.data);
      setTotalRecords(data?.count);
      localStorage.setItem("previousPath", "");
      setSkeletonLoading(false);
    } catch (error) {
      setSkeletonLoading(false);

      console.log(error);
    }
  };
  const getAllLeadsForRedux = async () => {
    try {
      var data: any = await fetcher("/leads_list", {
        id: Cookies.get("userData"),
        limit: 0,
        from: 0,
      });
      dispatch(setLeadsListRedux(data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("hey", leadsListForSearch);
  const searchingOnRedux = async () => {
    console.log("here", filters);

    // try {
    //   var data: any = await fetcher("/leads_list", {
    //     id: Cookies.get("userData"),
    //     limit: 0,
    //     from: 0,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    let filteredData = [];
    if (filtersArrayLocal.length !== 0) {
      filteredData = leadsListForSearch?.filter((item: any) => {
        return filtersArrayLocal.every((filter: any) => {
          if (Object.keys(filter)[0] === "name") {
            if (item?.events?.length !== 0) {
              return item?.events?.every((event: any) => {
                console.log(
                  "value",
                  event[Object.keys(filter)[0]]
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase())
                );

                return event[Object.keys(filter)[0]]
                  ?.toString()
                  ?.toLowerCase()
                  ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase());
              });
            }
          } else {
            return item[Object.keys(filter)[0]]
              ?.toString()
              ?.toLowerCase()
              ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase());
          }
        });
      });
      setResultsToShow(filteredData);

      return;
    } else {
      filteredData = leadsListForSearch.filter((item: any) => {
        return filters.every((filter: any) => {
          if (Object.keys(filter)[0] === "name") {
            if (item?.events?.length !== 0) {
              return item?.events?.every((event: any) => {
                console.log(
                  "value",
                  event[Object.keys(filter)[0]]
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase())
                );

                return event[Object.keys(filter)[0]]
                  ?.toString()
                  ?.toLowerCase()
                  ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase());
              });
            }
          } else {
            return item[Object.keys(filter)[0]]
              ?.toString()
              ?.toLowerCase()
              ?.includes(filter[Object.keys(filter)[0]]?.toLowerCase());
          }
        });
      });
      setResultsToShow(filteredData);
    }

    // }
  };
  const handleSearch = async (e: any) => {
    const value = { key: e?.target?.accessKey, value: e?.target?.value };
    debouncedDispatch(value);

    if (value?.value === "") {
      setFiltersArray(
        filtersArrayLocal.filter(
          (val: any) => Object.keys(val)[0] !== value?.key
        )
      );
      return;
    }
    let newObject: any = { [value?.key]: value?.value };
    let checkObj: any = filtersArrayLocal?.find(
      (data: any) => Object.keys(data)[0] === value?.key
    );

    if (checkObj) {
      checkObj = Object.keys(checkObj)[0];
      filtersArrayLocal.map((newObj: any) => {
        if (Object.keys(newObj)[0] === checkObj)
          newObj[checkObj] = value?.value;
      });
    } else {
      setFiltersArray([...filtersArrayLocal, newObject]);
    }

    console.log({ filtersArrayLocal });

    persistor.flush();
    if (e.target.value === "") {
      const value = { key: e?.target?.accessKey, value: "" };
      setFiltersArray([value]);
      debouncedDispatch(value);
      persistor.flush();
    }
    searchingOnRedux();
  };
  const handleSearchEmail = async (e: any) => {
    try {
      const data: any = await fetcher("/search_leads", {
        id: Cookies.get("userData"),
        lead: emailSearchQuery,
      });
      if (data?.status) {
        history.push(`/add-leads/${data?.data[0]?.id}?search=true`);
      } else {
        history.push("/add-leads");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllLeads = async () => {
    try {
      setSkeletonLoading(true);
      var data: any = await fetcher("/leads_list", {
        id: Cookies.get("userData"),
        limit: 0,
        from: 0,
      });
      setShowPaginagion(false);
      setLeadsList(data?.data);
      setResultsToShow(data?.data);
      setSkeletonLoading(false);
    } catch (error) {
      setSkeletonLoading(false);
      console.log(error);
    }
  };
  const handleChangePage = (page: number) => {
    const limit = 15;
    const from = limit * page - 15;
    getLeadsList(limit, from);
  };
  const handleCloseTag = (key: any) => {
    const value = { key, value: "" };
    setFiltersArray(
      filtersArrayLocal.filter((val: any) => Object.keys(val)[0] !== value?.key)
    );
    debouncedDispatch(value);
    setSearchFieldValue((prev: any) => {
      return { ...prev, [key]: "" };
    });
  };
  const preAssignFilterValues = () => {
    filters?.forEach((data: any) =>
      setSearchFieldValue((prev: any) => {
        return { ...prev, [Object.keys(data)[0]]: data[Object.keys(data)[0]] };
      })
    );
  };
  useEffect(() => {
    getAllLeadsForRedux();
  }, []);
  useEffect(() => {
    preAssignFilterValues();
  }, []);
  useEffect(() => {
    setResultsToShow([]);
    filters.length === 0 ? getLeadsList(15, 0) : searchingOnRedux();
  }, []);

  useEffect(() => {
    if (hasPageRendered.current === true) {
      setResultsToShow([]);
      filtersArrayLocal.length === 0 ? getLeadsList(15, 0) : searchingOnRedux();
    }
    hasPageRendered.current = true;
  }, [filtersArrayLocal]);

  const downloadCsvFile = () => {
    const csvString = [
      ["Full Name", "Email", "Mobile", "Referral", "Event Name", "Sales"],
      ...resultsToShow.map((item: any) => [
        `${item?.first_name} ${item?.last_name}`,
        item.email,
        item?.mobile,
        `${item?.referral === 1 ? "Yes" : "No"} ${
          item?.referral_by ? `referred by ${item?.referral_by}` : ""
        }`,
        item?.events?.length > 1
          ? `${item?.events?.[0]?.name}   ...${item?.events?.length - 1} more`
          : item?.events?.[0]?.name,
        item?.sales,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    if (csvString !== "" && downloadBtn.current !== null) {
      downloadBtn.current.href = `data:text/csv;charset=utf-8,${encodeURI(
        csvString
      )}`;
      downloadBtn.current.target = "_blank";
      downloadBtn.current.download = `Leads.csv`;
    }
    console.log(csvString);
  };
  {
  }

  const columns = [
    { name: "Full Name", value: "first_name" },
    // { name: "Last Name", value: "last_name" },
    { name: "Email", value: "email" },
    { name: "Mobile", value: "mobile" },
    { name: "Referral", value: "referral" },
    // { name: "Referral By", value: "referral_by" },
    { name: "Event Name", value: "name", event: true },
    { name: "Sales", value: "sales" },
    // { name: "Created At", value: "created" },
    { name: "Whatsapp Action", value: "first_name" },
  ];
  return (
    <>
      <div className="infoBar">
        <div className="col-md-8">
          <strong className="inforTitle">Total Leads : {totalRecord} </strong>
          {(filters.length !== 0 || filtersArrayLocal.length !== 0) && (
            <strong className="inforTitle">
              Filtered Leads : {resultsToShow.length}{" "}
            </strong>
          )}

          {/* <ul className="infobarOptions">
            <li>
              <a onClick={() => setShowAddNewModal(true)}>+ Add New</a>{" "}
            </li>
            <li>
              <a onClick={() => setShowImportModal(true)}>Import Data</a>{" "}
            </li>
          </ul> */}
        </div>
        <div className="d-flex col-md-4 action-holder">
          <div className="text-end pointer">
            {Cookies.get("export") === "true" && (
              <a
                ref={downloadBtn}
                onClick={downloadCsvFile}
                className="refresh"
              >
                <DownloadOutlined /> Export CSV
              </a>
            )}
          </div>

          <div className="text-end">
            <a href="/" className="refresh">
              <Image src={refresh} alt="refresh" width={18} height={24} />
              Refresh
            </a>
          </div>
        </div>
      </div>
      <div className="pb-2">
        {" "}
        {filters?.map((data: any) => (
          <Tag
            color="green"
            closable
            onClose={() => handleCloseTag(Object.keys(data)[0])}
          >
            {Object.keys(data)[0]}:{data[Object.keys(data)[0]]}
          </Tag>
        ))}
      </div>
      <div className="topFilter d-flex flex-wrap">
        <div className="col-12 col-md-8 mb-2 mb-md-0">
          {/* <button className="filterBtn">
                  <Image src={filter} alt="filter" width={40} height={32} />
                </button> */}
          <div className="searchBar d-inline-block">
            <input
              required
              onChange={(e: any) => setEmailSearchQuery(e?.target?.value)}
              type="text"
              placeholder="Search..."
            />
            <button onClick={handleSearchEmail} className=" mx-2 btn btn-blue">
              Search
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 text-end">
          <Link href="/add-leads" className="btn btn-blue">
            {" "}
            + Add Lead
          </Link>
        </div>
      </div>
      {/* Import Data Table Area */}
      <div className="importData table-responsive noselect">
        <table className="table table-bordered">
          <thead>
            <tr>
              {/* <th scope="col">
                <label className="checkholder">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <span className="srNumber">#</span>
              </th> */}
              {columns.map((data) => (
                <th scope="col">{data?.name}</th>
              ))}
            </tr>
            <tr>
              {columns.map((data, i) => {
                if (i < columns.length - 1) {
                  return (
                    <th key={i} scope="col">
                      <input
                        accessKey={data?.value}
                        onChange={(e) => {
                          handleSearch(e);
                          setSearchFieldValue((prev: any) => {
                            return { ...prev, [data.value]: e.target.value };
                          });
                        }}
                        type="text"
                        value={searchFieldValue[data.value]}
                      />
                      <span className="d-none">{data?.name}</span>
                    </th>
                  );
                }
              })}
            </tr>
          </thead>
          {skeletonLoading ? (
            <SkeletonLoader />
          ) : (
            <tbody>
              {resultsToShow?.map((data: any, key: number) => {
                return (
                  <tr
                    onClick={() => history.push(`/add-leads/${data?.id}`)}
                    key={key}
                    className={`pointer ${data?.referral === 1 && "highlight"}`}
                  >
                    {/* <td>
                    <label className="checkholder">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>

                    <span className="srNumber">{data?.id}</span>
                  </td> */}
                    <td>{`${data?.first_name}   ${data?.last_name}`}</td>
                    {/* <td>{data?.last_name}</td> */}
                    <td>{data?.email}</td>
                    <td>{data?.mobile}</td>
                    <td>
                      {data?.referral === 1 ? "Yes" : "No"}{" "}
                      {data?.referral_by && `by ${data?.referral_by}`}
                    </td>
                    {/* <td>{data?.referral_by}</td> */}
                    {/* <td>{data?.events?.[0]?.type}</td> */}
                    <td>
                      {data?.events?.length > 1
                        ? `${data?.events?.[0]?.name}   ...${
                            data?.events?.length - 1
                          } more`
                        : data?.events?.[0]?.name}
                    </td>
                    <td>{data?.sales}</td>
                    {/* <td className="yes">
                          {data?.confirmed === 0 ? "No" : "False"}
                        </td> */}
                    {/* <td>{data?.created}</td> */}
                    {/* <td>{data?.status}</td> */}
                    <td>
                      {/* <ul>
                            <li> */}
                      <Link
                        title="view & edit"
                        className="pointer edit-icon"
                        href={`/add-leads/${data?.id}`}
                      >
                        <EditOutlined />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {showPagination && (
        <div className="d-flex btn-wrap">
          <Pagination
            className="pt-3"
            onChange={(page) => handleChangePage(page)}
            defaultCurrent={1}
            total={totalRecord}
            pageSize={15}
            // pageSize={10}
          />
          <span className="link" onClick={getAllLeads}>
            View All Leads
          </span>
        </div>
      )}
      {showAddNewModal && (
        <AddNewModal
          show={showAddNewModal}
          onHide={() => setShowAddNewModal(false)}
        />
      )}{" "}
      {showImportModal && (
        <ImportModal
          show={showImportModal}
          onHide={() => setShowImportModal(false)}
        />
      )}
    </>
  );
}
