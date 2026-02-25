import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import useScrollPosition from '../../hooks/useScrollPosition'

const MobileNav = ({ navbarLinks, bg = true }) => {
    const theme = useTheme()
    const { isScrolled } = useScrollPosition(10);

    return (
        <Stack

            width="100vw"
            height="60px"
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            position="fixed"
            bottom={0}
            left={0}
            zIndex={100}
            sx={{
                backdropFilter: isScrolled ? "blur(10px)" : "none",
                background: theme.palette.mode === "dark" ? isScrolled
                    ? "rgba(0,0,0,0.5)"
                    : "rgba(0,0,0,0.9)"
                    :
                    isScrolled
                        ? "rgba(252,252,252,0.6)"
                        : "rgba(252,252,252,0.95)",
                transition: "0.3s ease",
                boxShadow: isScrolled
                    ? "0px 2px 12px rgba(0,0,0,0.1)"
                    : "0px 0px 15px rgba(200,17,70,0.1)",
                display: { xs: "flex", md: "none" }
            }}
        >


            <Stack
                height="100%"
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                zIndex={100}
                px={1}
                sx={{
                    width: "100%",
                    display: { xs: "flex", md: "none" },
                    transition: "all 0.3s ease",
                }}
            >
                {navbarLinks.map((btn, i) => (
                    <NavLink
                        key={i}
                        to={btn.path}
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            color: theme.palette.mode === "dark" ?
                                isActive ? "#ff1100" : "white "
                                : isActive ? "#ff1100" : "black ",
                            fontWeight: isActive ? "900" : "normal",
                            paddingBottom: "4px",
                            padding:"0px 5px ",
                            display: "inline-block",
                            borderBottom: isActive ? "2px solid #FF1100" : "2px solid transparent",
                            transition: "all 0.25s ease",

                        })}
                    >
                        <Stack direction="column" alignItems="center" spacing={0.5}>
                            {btn.icon}
                            <Typography variant="body2">{btn.label}</Typography>
                        </Stack>

                    </NavLink>
                ))}
            </Stack>

        </Stack>



    )
}

export default MobileNav