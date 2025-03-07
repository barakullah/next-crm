export default function ActivityLogs() {
  return (
    <>
    <div className="infoBar">
      <div className="col-md-10">
        <a href="" className="btn1 btnArrow">
          {" "}
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM11 3.5L1 3.5V4.5L11 4.5V3.5Z"
              fill="#9B9B9B"
            />
          </svg>{" "}
          Back
        </a>
      </div>
      <div className="col-md-2 text-end">
        {/* <a href="" className="refresh">
          <Image src={refresh} alt="refresh" width={18} height={24} />
          Reset Filter
        </a> */}
      </div>
    </div>
    <div className="activityLogArea">
      <h2>User Activity Log</h2>

      <table className="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Owner</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Created</td>
            <td>LP GOLD</td>
            <td>10 Nov 2024</td>
          </tr>
          <tr>
            <td>Updated - To Valid</td>
            <td>Barak Ullah</td>
            <td>11 Nov 2024</td>
          </tr>
          <tr>
            <td>Call Back</td>
            <td>WhatsApp</td>
            <td>14 Nov 2024</td>
          </tr>
          <tr>
            <td>Open Account</td>
            <td>WhatsApp</td>
            <td>14 Nov 2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
  );
}
