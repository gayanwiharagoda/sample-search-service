import { Request, Response, NextFunction } from "express";
import Model from "./model";
import { getMaxMinQuery } from "../../utils/query";

const errorMessage =
  "could not fetch ipps data properly. Please contact customer service.";

const generateConditions = ({
  min_discharges,
  max_discharges,
  min_average_covered_charges,
  max_average_covered_charges,
  min_average_medicare_payments,
  max_average_medicare_payments
}) => {
  const totalDischarges = getMaxMinQuery(
    "totalDischarges",
    min_discharges,
    max_discharges
  );
  const averageCoveredCharges = getMaxMinQuery(
    "convetedAverageCoveredCharges",
    min_average_covered_charges,
    max_average_covered_charges
  );
  const averageMedicarePayments = getMaxMinQuery(
    "convetedAverageMedicarePayments",
    min_average_medicare_payments,
    max_average_medicare_payments
  );

  const selectionQuery = {
    ...totalDischarges,
    ...averageCoveredCharges,
    ...averageMedicarePayments
  };

  return Model.aggregate([
    {
      $addFields: {
        convetedAverageCoveredCharges: {
          $substr: ["$averageCoveredCharges", 1, -1]
        },
        convetedAverageMedicarePayments: {
          $substr: ["$averageMedicarePayments", 1, -1]
        }
      }
    },
    {
      $addFields: {
        convetedAverageCoveredCharges: {
          $convert: {
            input: "$convetedAverageCoveredCharges",
            to: "double",
            onError: 0
          }
        },
        convetedAverageMedicarePayments: {
          $convert: {
            input: "$convetedAverageMedicarePayments",
            to: "double",
            onError: 0
          }
        }
      }
    },
    { $match: selectionQuery }
  ]);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = await generateConditions(req.query);
    res.send(result);
  } catch (err) {
    res.send({
      message: errorMessage,
      err: err
    });
  }
};
