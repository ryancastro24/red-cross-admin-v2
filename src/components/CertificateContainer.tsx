import redcrosslogo from "@/assets/redcross_logo.png";

type CertificateContainerTypes = {
  name: string | undefined;
  dateEvaluation: string | undefined;
  dateValidity: string | undefined;
  dateStarted: string | undefined;
  category: string | undefined;
};

const CertificateContainer = ({
  name,
  dateEvaluation,
  dateValidity,
  dateStarted,
  category,
}: CertificateContainerTypes) => {
  return (
    <div
      id="certificate"
      style={{
        width: "794px",
        height: "1123px",
        margin: "0 auto",
        padding: "20px",
        border: "10px solid #ddd",
        backgroundColor: "white",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
        position: "absolute",
        top: "-5000px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          border: "5px solid #aaa",
          padding: "30px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <img
          src={redcrosslogo}
          alt="redcross"
          className="absolute top-8 left-32 w-[100px]"
        />
        <img src="" alt="" />
        <div
          className="flex items-center justify-center gap-6"
          style={{ marginBottom: "40px" }}
        >
          <div className="relative h-28"></div>

          <div className="w-full">
            <h1
              style={{ fontSize: "24px", textAlign: "center" }}
              className="text-blue-900"
            >
              PHILIPPINE RED CROSS
            </h1>
            <h2
              style={{ fontSize: "16px", textAlign: "center" }}
              className="text-blue-900"
            >
              CAVITE CHAPTER
            </h2>
            <h2
              style={{ fontSize: "16px", textAlign: "center" }}
              className="text-rose-600"
            >
              DASMARIÑAS CITY BRANCH
            </h2>
            <div className="flex flex-col items-center">
              <p
                className="text-blue-800"
                style={{ fontSize: "12px", textAlign: "center" }}
              >
                Ground Floor, Units 2 & 3, Amada Building
              </p>
              <p
                className="text-blue-800"
                style={{ fontSize: "12px", textAlign: "center" }}
              >
                Emilio Aguinaldo Highway, Barangay Zone IV, Dasmariñas Cavite
                City
              </p>
              <p
                className="text-blue-800"
                style={{ fontSize: "12px", textAlign: "center" }}
              >
                Tel No. (046) 4026267
              </p>
              <p
                className="text-blue-800"
                style={{ fontSize: "12px", textAlign: "center" }}
              >
                <u>cavitedasmariñas@redcross.org.ph</u>
              </p>
            </div>
          </div>
        </div>

        {/* Certification Section */}
        <div style={{ marginTop: "20px" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "0px",
              fontSize: "25px",
            }}
          >
            CERTIFICATION
          </h2>
          <div style={{ textAlign: "justify" }}>
            <h2
              style={{
                textAlign: "left",
                marginBottom: "18px",
                fontSize: "13px",
              }}
            >
              TO WHOM MAY IT CONCERN:
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 2,
                marginTop: "10px",
                textIndent: "100px",
              }}
            >
              This is to certify that <strong>{name || "Sample Name"}</strong>{" "}
              graduated in{" "}
              <strong>
                {(category || "Sample Category").toUpperCase()} FIRST AID AND
                BLS CPR / AED TRAINING
              </strong>{" "}
              conducted on {dateStarted?.split(",")[0] || "Date Not Provided"}-
              {dateEvaluation?.split(" ")[1]} {dateStarted?.split(",")[1]} at
              Philippine Red Cross Dasmariñas City Branch, G/F Units 2 & 3 Amada
              Building, Emilio Aguinaldo Highway, Barangay Zone IV, Dasmariñas
              Cavite City, and <strong>PASSED</strong> the evaluating
              examination given on {dateEvaluation}. The training was conducted
              under the supervision of{" "}
              {/* {instructors.length > 0
                ? instructors.map((instructor, index) => (
                    <span key={index}>
                      {index > 0 && ", "}
                      {instructor}
                    </span>
                  ))
                : "select instructors"}
              . */}
            </p>
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                textIndent: "100px",
              }}
            >
              This certification is being issued for <strong>reference</strong>{" "}
              purposes and shall be valid up to {dateValidity} only.
            </p>
          </div>
        </div>

        {/* Signature Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <div>
            <p style={{ fontSize: "16px", fontWeight: "900" }}>
              <strong>GARY C. SANTOS, AEMT</strong>
            </p>
            <p style={{ fontSize: "12px" }}>BRANCH HEAD</p>
            <p style={{ fontSize: "12px" }}>Philippine Red Cross</p>
            <p style={{ fontSize: "12px" }}>Cavite Chapter - Dasmariñas City</p>
          </div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: "900" }}>
              <strong>ADELINA B. CASTILLO, RN</strong>
            </p>
            <p style={{ fontSize: "12px" }}>CHAPTER ADMINISTRATOR</p>
            <p style={{ fontSize: "12px" }}>Philippine Red Cross</p>
            <p style={{ fontSize: "12px" }}>Cavite Chapter</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          width: "100%",
          height: "75px",
          padding: "10px",
          backgroundColor: "#dc2626",
          bottom: "250px",
          left: "0",
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <p style={{ color: "white", fontSize: "16px", fontStyle: "italic" }}>
          Always First, Always Ready, Always There!
        </p>
      </div>
    </div>
  );
};

export default CertificateContainer;
