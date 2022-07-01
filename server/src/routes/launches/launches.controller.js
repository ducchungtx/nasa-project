const { getAllLaunches, addNewLaunch, existsLaunchWithId,
  abortLaunchById, } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  // * Map convert to json "launches"
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Mission, rocket, launchDate, target are required'
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate.getTime())) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid date'
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}


module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
