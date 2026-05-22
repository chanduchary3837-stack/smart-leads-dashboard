import { Request, Response } from "express";

let leads: any[] = [];

export const createLead = (
  req: Request,
  res: Response
): void => {
  const newLead = {
    id: Date.now(),
    ...req.body,
  };

  leads.push(newLead);

  res.status(201).json({
    message: "Lead Created",
    lead: newLead,
  });
};

export const getLeads = (
  req: Request,
  res: Response
): void => {
  res.status(200).json(leads);
};

export const getLeadById = (
  req: Request,
  res: Response
): void => {
  const lead = leads.find(
    (l) => l.id == req.params.id
  );

  if (!lead) {
    res.status(404).json({
      message: "Lead not found",
    });

    return;
  }

  res.json(lead);
};

export const updateLead = (
  req: Request,
  res: Response
): void => {
  const index = leads.findIndex(
    (l) => l.id == req.params.id
  );

  if (index === -1) {
    res.status(404).json({
      message: "Lead not found",
    });

    return;
  }

  leads[index] = {
    ...leads[index],
    ...req.body,
  };

  res.json({
    message: "Lead Updated",
    lead: leads[index],
  });
};

export const deleteLead = (
  req: Request,
  res: Response
): void => {
  leads = leads.filter(
    (l) => l.id != req.params.id
  );

  res.json({
    message: "Lead Deleted",
  });
};