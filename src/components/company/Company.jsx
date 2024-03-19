import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Image } from "@mantine/core";
import {
  IconBuilding,
  IconChevronRight,
  IconMap,
  IconMapPin,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios-connect";

const Company = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    fetchCompanyDetails(id);
  }, [id]);

  const fetchCompanyDetails = async (id) => {
    let { data } = await axiosInstance.get(`/industries/${id}`);
    setCompany(data);
  };

  return (
    <Container className="my-4 space-y-5" size="xl">
      <div className="flex gap-2 items-center">
        <Link className="hover:bg-slate-100 p-1" to={"/company"}>
          Danh sách Công ty
        </Link>
        <IconChevronRight size={18} />
        <p>{company.name}</p>
      </div>

      <div
        style={{ background: "linear-gradient(90deg, #212f3f, #00b14f)" }}
        className="flex flex-col rounded-xl overflow-hidden"
      >
        <div>
          <Image h={250} src={company.image} />
        </div>

        <div className="flex space-x-[6rem]">
          <div className="relative bottom-16 left-10">
            <Image
              className="border rounded-full bg-white"
              h={180}
              w={180}
              fit="contain"
              src={company.logo}
            />
          </div>

          <div className="flex flex-col flex-1 my-5">
            <div>
              <p className="text-2xl text-white font-semibold">
                {company.name}
              </p>
            </div>

            <div className="text-white flex space-x-3 mt-3">
              <div className="flex space-x-5">
                <IconWorld />
                <a href={company.website}>{company.website}</a>
              </div>
              <div className="flex space-x-5">
                <IconBuilding />
                <p>{company.totalEmployees}+ nhân viên</p>
              </div>
              <div className="flex space-x-5">
                <IconUsersGroup />
                <p>{company.totalFollowers} người theo dõi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <div>
          <Grid>
            <Grid.Col span={8}>
              <div
                className="py-4 px-5 rounded-t-xl overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, #212f3f, #00b14f)",
                }}
              >
                <p className="text-white text-xl font-semibold">
                  Giới thiệu công ty
                </p>
              </div>

              <div className="bg-[#f5f5f5] p-5 text-lg">
                <p>{company.description}</p>
              </div>
            </Grid.Col>

            <Grid.Col span={4}>
              <div
                className="py-4 px-5 rounded-t-xl overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, #212f3f, #00b14f)",
                }}
              >
                <p className="text-white text-xl font-semibold">
                  Thông tin liên hệ
                </p>
              </div>

              <div className="bg-[#f5f5f5] p-5">
                <div className="space-y-5">
                  <div>
                    <div className="p-1 flex space-x-2">
                      <IconMapPin />
                      <p className="font-semibold">Địa chỉ công ty</p>
                    </div>

                    <p className="text-lg">{company.location}</p>
                  </div>

                  <Divider />

                  <div>
                    <div className="flex space-x-2 p-1">
                      <IconMap />
                      <p>Xem bản đồ</p>
                    </div>

                    <div className="mt-1">
                      <iframe
                        class="gmap_iframe"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        width={"100%"}
                        src={company.locationUrl}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default Company;
