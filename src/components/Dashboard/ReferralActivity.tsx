export default function ReferralActivity() {

  return <div className="bg-black p-8 flex-1">

    <div className="bg-[#0F1122] p-8 rounded-t-xl">
      <div className="bg-inherit py-3 rounded-t-xl text-l text-[#FF5906]">
        <p>Referral Activity</p>
      </div>
      <table className="table table-fixed w-full text-left p-4"> 
        <thead>
          <tr className="text-white text-align-left">
            <th> Address </th>
            <th> Tier </th>
            <th> Referrals </th>
            <th> Activity </th>
          </tr>
        </thead>
        <tbody className="text-white">
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
            <td> something else</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>;
}