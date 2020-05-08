-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 08, 2020 alle 15:49
-- Versione del server: 10.3.22-MariaDB-0+deb10u1
-- Versione PHP: 7.3.14-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awwa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commento`
--

CREATE TABLE `commento` (
  `id` int(11) NOT NULL,
  `id_utente` varchar(50) NOT NULL,
  `id_post` int(11) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `data` varchar(16) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `messaggi`
--

CREATE TABLE `messaggi` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `oggetto` varchar(50) NOT NULL,
  `messaggio` varchar(8000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` varchar(16) NOT NULL,
  `titolo` varchar(30) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `id_serie` varchar(8) NOT NULL,
  `numero_stagione` varchar(2) NOT NULL,
  `numero_episodio` varchar(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `data_nascita` varchar(10) NOT NULL,
  `nazione` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nome_utente` varchar(15) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`nome`, `cognome`, `data_nascita`, `nazione`, `email`, `nome_utente`, `password`) VALUES
('Giuseppe', 'Latrofa', '1999-01-28', 'Italy', 'g.latrofa3@studenti.poliba.it', 'peppone', '014635095eeeda4945a6c17d0cfb6abb');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utente` (`id_utente`),
  ADD KEY `id_post` (`id_post`);

--
-- Indici per le tabelle `messaggi`
--
ALTER TABLE `messaggi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `nome_utente` (`nome_utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commento`
--
ALTER TABLE `commento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `messaggi`
--
ALTER TABLE `messaggi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
