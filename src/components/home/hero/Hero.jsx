import { Container, Title, Text, Button } from "@mantine/core";
import classes from "./Hero.module.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              FreeCV: Your{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                one-stop
              </Text>{" "}
              shop for landing your dream job!
            </Title>

            <Text className={classes.description} mt={30}>
              FreeCV is a revolutionary online platform designed to empower job
              seekers with everything they need to stand out in today's
              competitive market. We offer a completely free suite of tools to
              craft a winning CV, find your perfect job match, and showcase your
              skills to potential employers.
            </Text>

            <Link to={"/login"}>
              <Button
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
