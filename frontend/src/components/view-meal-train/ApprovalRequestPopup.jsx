export default function ApprovalRequestPopup({
  onRequest,
  onCancel,
  requestSent,
  inviterName,
  mealTrainName
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-[40]" onClick={onCancel} />

      <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onCancel}>
        <div
          className="w-[92%] max-w-xl bg-[#e9d6b3] rounded-[36px] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 px-8 py-5 bg-[#f68300]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M35 28.75C35 30.4076 34.3415 31.9973 33.1694 33.1694C31.9973 34.3415 30.4076 35 28.75 35H11.25C9.5924 35 8.00269 34.3415 6.83058 33.1694C5.65848 31.9973 5 30.4076 5 28.75V15H35V28.75ZM26.51 19.115C26.3939 18.9986 26.2559 18.9062 26.1041 18.8432C25.9522 18.7802 25.7894 18.7478 25.625 18.7478C25.4606 18.7478 25.2978 18.7802 25.1459 18.8432C24.9941 18.9062 24.8561 18.9986 24.74 19.115L18.125 25.7325L15.26 22.865L15.0625 22.705C14.8038 22.531 14.4895 22.46 14.1812 22.5058C13.8728 22.5517 13.5928 22.711 13.3959 22.9527C13.199 23.1944 13.0995 23.5009 13.1169 23.8121C13.1343 24.1233 13.2674 24.4168 13.49 24.635L17.24 28.385C17.3561 28.5014 17.4941 28.5938 17.6459 28.6568C17.7978 28.7198 17.9606 28.7522 18.125 28.7522C18.2894 28.7522 18.4522 28.7198 18.6041 28.6568C18.7559 28.5938 18.8939 28.5014 19.01 28.385L26.51 20.885C26.6264 20.7689 26.7188 20.6309 26.7818 20.4791C26.8448 20.3272 26.8772 20.1644 26.8772 20C26.8772 19.8356 26.8448 19.6728 26.7818 19.5209C26.7188 19.3691 26.6264 19.2311 26.51 19.115ZM28.75 5C30.4076 5 31.9973 5.65848 33.1694 6.83058C34.3415 8.00269 35 9.5924 35 11.25V12.5H5V11.25C5 9.5924 5.65848 8.00269 6.83058 6.83058C8.00269 5.65848 9.5924 5 11.25 5H28.75Z"
                fill="white"
              />
            </svg>

            <h2 className="text-white text-xl font-bold">Join Meal Train</h2>
          </div>

          <div className="px-12 py-12 text-center">
            {!requestSent ? (
              <>
                <p className="text-xl font-semibold text-[#1f2a24] mb-10">
                  {inviterName} invited you to help in {mealTrainName}
                </p>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={onRequest}
                    className="px-8 py-3 rounded-full bg-[#9b87f5] text-white font-semibold hover:brightness-95 transition"
                  >
                    Ask for approval
                  </button>

                  <button
                    onClick={onCancel}
                    className="px-8 py-3 rounded-full bg-[#e74d3d] text-white font-semibold hover:brightness-95 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-[#1f2a24] mb-8"> Request sent</p>

                <button
                  onClick={onCancel}
                  className="px-8 py-3 rounded-full bg-[#e74d3d] text-white font-semibold hover:brightness-95 transition"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
