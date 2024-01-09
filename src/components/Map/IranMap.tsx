"use client";
import { useState, useEffect } from "react";
import { iranProvincesDefault } from "./IranProvinces";
import iranBorder, { caspianD, persianGulfD } from "./IranMapData";
import styles from "./style.module.scss";
import { ProvinceType } from "@/components/Map/types";

const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handle(e: any) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }

    const mapEffect = document.querySelector("svg");
    mapEffect?.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  }, [setMousePosition]);
  return mousePosition;
};

interface IranMapType {
  onClick?: (param: ProvinceType) => void;
  onHover?: (param: ProvinceType) => void;
  items?: ProvinceType[];
}

export const IranMap = (props: IranMapType) => {
  const { onClick, onHover, items } = props;
  const { x, y } = useMouse();
  const [provinces] = useState(iranProvincesDefault);
  const [provinceName, setProvinceName] = useState("");
  const [mapZoom, setMapZoom] = useState(false);

  function handleClickProvince(province: ProvinceType) {
    onClick?.(province);
  }

  function handleHoverProvince(province: ProvinceType) {
    setProvinceName(province.name);
    onHover?.(province);
  }

  return (
    <>
      <span className={styles["show_title"]}>
        {provinceName}
        <style>{`
          span {
            left: ${x + 5 + "px"};
            top: ${y + 5 + "px"};
            z-index: 999;
          }
        `}</style>
      </span>
      <div className={styles["container"]}>
        <div className={styles["map"]}>
          <button
            className={
              mapZoom
                ? styles["zoom_btn"] + " " + styles["zoom_out"]
                : styles["zoom_btn"] + " " + styles["zoom_in"]
            }
            onClick={() => {
              setMapZoom(!mapZoom);
            }}
          />
          <svg
            className={
              mapZoom ? styles["svg"] + " " + styles["map_zoom"] : styles["svg"]
            }
            version="1.1"
            viewBox="20 0 970 960"
            enableBackground="new 20 0 970 960"
            xmlSpace="preserve"
          >
            <g className={styles["border"]}>
              <path className={styles["iran"]} d={iranBorder} />
            </g>
            {provinces.map((province: ProvinceType) => (
              // eslint-disable-next-line react/jsx-key
              <>
                <g
                  className={
                    province.enable ? styles["province"] : styles["province-dis"]
                  }
                >
                  <path
                    key={province.id}
                    className={province.className}
                    // d={province.enable ? province.d : ""}
                    d={province.d}
                    onMouseOver={() => {
                      handleHoverProvince(province);
                    }}
                    onMouseLeave={() => {
                      handleHoverProvince({ name: "", id: 0 });
                    }}
                    onClick={() => {
                      if(province.enable) {
                        handleClickProvince(province);
                      }
                    }}
                  />
                </g>
              </>
            ))}
            <g className={styles["sea"]}>
              <path className={styles["caspian"]} d={caspianD} />
              <path
                className={styles["persian_gulf"]}
                onMouseOver={() =>
                  handleHoverProvince({ name: "جزایر خلیج فارس", id: 0 })
                }
                onMouseLeave={() => handleHoverProvince({ name: "", id: 0 })}
                d={persianGulfD}
              />
            </g>
            <g className={styles["lake"]}>
              <path
                className={styles["jazmourian"]}
                d=" M 735.39 728.39 C 739.32 725.48 744.50 726.12 749.09 726.06 C 748.87 730.23 748.85 734.76 746.25 738.27 C 744.31 740.90 742.24 743.89 739.07 745.09 C 735.82 743.00 735.87 738.59 734.78 735.26 C 734.53 733.01 733.02 729.97 735.39 728.39 Z"
              />
              <path
                className={styles["qom"]}
                d=" M 392.53 316.41 C 396.15 319.51 400.05 322.33 403.25 325.88 C 405.56 328.37 405.60 331.94 406.17 335.09 C 399.76 335.20 393.56 333.51 387.51 331.56 C 390.12 326.86 392.05 321.79 392.53 316.41 Z"
              />
              <path
                className={styles["urmia"]}
                d=" M 70.94 100.38 C 76.66 94.04 88.01 97.27 90.48 105.14 C 89.12 111.83 86.35 118.54 87.47 125.50 C 88.30 127.83 90.56 129.30 92.62 130.47 C 95.27 131.90 98.30 130.53 101.12 130.96 C 104.02 131.89 105.83 134.55 107.85 136.66 C 105.87 138.36 103.19 140.92 105.12 143.69 C 109.33 148.80 115.47 152.40 118.27 158.65 C 118.78 159.50 118.71 160.29 118.05 161.03 C 115.60 163.09 112.39 164.01 109.96 166.10 C 109.61 169.05 109.90 172.04 109.99 175.00 C 107.00 174.40 103.25 174.51 101.33 171.69 C 96.74 164.74 92.82 157.11 86.45 151.56 C 83.31 148.97 83.19 144.67 81.91 141.10 C 80.21 136.23 78.11 131.51 76.67 126.55 C 75.23 125.31 73.66 124.19 72.49 122.68 C 71.82 120.64 71.96 118.40 72.41 116.33 C 73.48 112.43 78.57 111.08 79.29 107.06 C 79.94 102.30 74.03 101.97 70.94 100.38 Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default IranMap;
